
module.exports = function(resume){
  let score = 40;
  if(resume.skills?.length > 5) score += 20;
  if(resume.summary?.length > 120) score += 20;
  if(resume.experience?.length > 120) score += 20;
  return score > 100 ? 100 : score;
}
