exports.Fibonacci = async (req, res) => {
  try {
    const { n } = req.body;

    let data = [];

    let n1 = 0,
      n2 = 1,
      nextTerm;

    for (let i = 1; n1 <= n; i++) {
      data.push(n1);
      nextTerm = n1 + n2;
      n1 = n2;
      n2 = nextTerm;
    }

    let result = data.join(" ");

    if (!n) {
      res.status(400).send({
        status: 400,
        code: "400",
        data: null,
        message: "n is required",
      });
    } else {
      res.status(200).send({
        status: 200,
        code: "200",
        data: {
          result,
        },
        message: "Success",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
