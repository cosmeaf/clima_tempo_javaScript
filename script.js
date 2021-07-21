document.querySelector('.busca').addEventListener('submit', async function(event){
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){
        clearInfo();
        showWarnning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=35641d89c89b7b323992d8ef7c76de22&units=metric&lang=pt_br`;

        let result = await fetch(url);
        let json = await result.json();
        
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarnning('Região não encontrada ou inexistente');
        }

    }else{
        clearInfo();
    }

});

function showInfo(json){
    showWarnning('');
    

    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>&degC</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarnning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    showWarnning('');
    document.querySelector('.resultado').style.display = 'none';
}