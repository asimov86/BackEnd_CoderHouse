
function functionLogout(){
    fetch('/api/session/logout')
    .then(result=> result.status)
    .then(status=>{
        console.log(status);
        location.assign("/login");
      });
    
};
