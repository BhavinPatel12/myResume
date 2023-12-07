const skillCont = (req, res) => {
  console.log('res: ', res);
  res.render("skill", { title: "Skill" });
};
export { skillCont };
