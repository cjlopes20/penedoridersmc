jQuery(function () {
    
    setInterval(function () {        
        var usuario = localStorage.getItem("User");
        if(!usuario){
            window.location.href = 'index.html';
        } else {
            var obj = JSON.parse(usuario);
            if(!obj.id){
                window.location.href = 'index.html';
            }
        }
    }, 1500);
    
});

function menuSair() {
    localStorage.clear();
    window.location.href = 'index.html';
}