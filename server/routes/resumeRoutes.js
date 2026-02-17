const router = require("express").Router();
const Resume = require("../models/Resume");
const auth = require("../middleware/auth");
const calculateATS = require("../utils/ats");
const PDFDocument = require("pdfkit");

/* ===============================
   CREATE RESUME
================================= */
router.post("/create", auth, async (req, res) => {
  try {
    const atsScore = calculateATS(req.body);

    const resume = await Resume.create({
      ...req.body,
      userId: req.user.id,
      atsScore,
      version: 1,
    });

    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating resume" });
  }
});

/* ===============================
   GET MY RESUMES
================================= */
router.get("/my", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resumes" });
  }
});

/* ===============================
   DOWNLOAD PDF BY RESUME ID
================================= */
router.get("/download/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${resume.title}.pdf`
    );

    doc.pipe(res);

    // Title
    doc.fontSize(22).text(resume.title, { underline: true });
    doc.moveDown();

    // Summary
    doc.fontSize(16).text("Summary:");
    doc.fontSize(12).text(resume.summary);
    doc.moveDown();

    // Skills
    doc.fontSize(16).text("Skills:");
    doc.fontSize(12).text(resume.skills.join(", "));
    doc.moveDown();

    // Experience
    doc.fontSize(16).text("Experience:");
    doc.fontSize(12).text(resume.experience);

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating PDF" });
  }
});

module.exports = router;
