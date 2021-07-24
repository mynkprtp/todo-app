app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Acess-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    // content-type and authorizations headers are set manually
    next();
  });

      axios({
      method: "POST",
      url: "http://localhost:5000/api/users/googleLogin",
      data: { tokenId: res.tokenId },
    })
      .then((response) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });


      const responseSuccessGoogle =async (res) => {
        console.log(res);
        try{
          const response = await fetch("http://localhost:5000/api/users/googleLogin", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({ tokenId: res.tokenId }),
          });
          const responseData = await response.json();
          console.log(responseData);
        } catch(err) {
          console.error(err);
        }
        auth.login();
      };

      const responseSuccessGoogle =(res) => {
        console.log(res);
        axios({
          method:"POST",
          url:"http://localhost:5000/api/users/googleLogin",
          data:{tokenId:res.tokenId}
        }).then(response=>{
          console.log(response);
        }).catch(err=>console.log(err));
        auth.login();
      };