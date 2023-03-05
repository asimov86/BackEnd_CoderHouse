const form = document.getElementById('resetPasswordForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key] = value);

    fetch('/api/session/resetPassword',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=> result.status)
    .then(status=>{
        console.log(status);
        location.assign("/login");
      });
});

function goToRegister() {
    location.href = '/register';
}