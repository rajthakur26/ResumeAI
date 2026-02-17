const router = require('express').Router();

router.post('/summary', async (req, res) => {
  const { skills, experience } = req.body;

  // Simulated AI summary generation
  const summary = `
Highly motivated professional skilled in ${skills}.
With hands-on experience in ${experience}, 
I have successfully built scalable, secure, and high-performance applications.
Strong problem-solving abilities and a passion for continuous learning.
  `.trim();

  res.json({ summary });
});

module.exports = router;
