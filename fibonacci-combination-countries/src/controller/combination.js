exports.Combinations = async (req, res) => {
  try {
    let { n, r } = req.body;

    function product_Range(a, b) {
      let prd = a,
        i = a;

      while (i++ < b) {
        prd *= i;
      }
      return prd;
    }

    let combination = (() => {
      if (n == r || r == 0) {
        return 1;
      } else {
        r = r < n - r ? n - r : r;
        return product_Range(r + 1, n) / product_Range(1, n - r);
      }
    })();

    if (!n || !r) {
      res.status(400).send({
        status: 400,
        code: "400",
        data: null,
        message: "n or r is required",
      });
    } else {
      res.status(200).send({
        status: 200,
        code: "200",
        data: {
          result: combination,
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
