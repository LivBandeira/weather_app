function getWeather() {
    let city = document.getElementById('city').value;

    if (city) {
        let appId = 'dea09dc5675f6ea6ac4b59b7a982c046';
        let country = document.getElementById('country').value;
        let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let xhr = new XMLHttpRequest();
        let url = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=' + appId + '&q=' + city + ',' + country + '&cnt=5';

        if ('withCredentials' in xhr) {
            xhr.open('GET', url, true);
        } else if (typeof XDomainRequest != 'undefined') {
            xhr = new XDomainRequest();
            xhr.open('GET', url);
        } else {
            xhr = null;
        }

        let request = xhr;

        request.onload = function() {
            if (this.status == 200) {
                let cards = ['card1', 'card2', 'card3', 'card4', 'card5'];
                let response = JSON.parse(this.response);

                for (let i = 0; i < response.list.length; i++) {
                    let date = (new Date(response.list[i].dt * 1000));
                    let weather = response.list[i].weather[0];
                    let temp = (response.list[i].temp.day - 273.15).toFixed(0);

                    document.getElementById('day' + (i + 1)).getElementsByClassName('weekDay')[0].innerHTML = dayNames[date.getDay()];
                    document.getElementById('day' + (i + 1)).getElementsByClassName('flaticon')[0].className = 'flaticon ' + weather.main;
                    document.getElementById('day' + (i + 1)).getElementsByClassName('degrees')[0].innerHTML = temp + '°C';
                    document.getElementById('day' + (i + 1)).getElementsByClassName('condition')[0].innerHTML = weather.main;
                    document.getElementById('day' + (i + 1)).className = cards[i];
                }

            } else {
                alert('Connection Error!');
            }
        };

        request.send();
    } else {
        alert('You must inform the city!');
    }
}

document.getElementById('get-weather').addEventListener('click', getWeather);
