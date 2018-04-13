$(function () {
	// get user ip location for weather
	$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
		const lat = data.lat;
		const lon = data.lon;
		const city = data.city;
		const region = data.region;
		const regionL = data.regionName;
		const zip = data.zip;
		
		// get weather from ip
		const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';
		// send to api
		const wData = {
			lat,
			lon,
			units : "imperial",
			APPID : 'fffa8454004d1040b5755939d9baf5f4'

		};

		// callback from weather api
		const showWeather = (data) => {
			let Str = data.weather[0].description;
			Str = Str.replace(/ +/g, "");
			let photos = {
					"clearsky": '/img/weather/clear.jpg',
					"fewclouds": '/img/weather/fewclouds.jpg',
					"scatteredclouds": '/img/weather/scatteredclouds.jpg',
					"brokenclouds": '/img/weather/brokenclouds.jpg',
					"overcastclouds": '/img/weather/brokenclouds.jpg',
					
					"showerrain": '/img/weather/showerrain.jpg',
					"lightintensitydrizzle" : '/img/weather/showerrain.jpg',
					"drizzle" : '/img/weather/showerrain.jpg',
					"heavyintensitydrizzle" : '/img/weather/showerrain.jpg',
					"lightintensitydrizzlerain" : '/img/weather/showerrain.jpg',
					"drizzlerain" : '/img/weather/showerrain.jpg',
					"heavyintensitydrizzlerain" : '/img/weather/showerrain.jpg',
					"showerrainanddrizzle" : '/img/weather/showerrain.jpg',
					"heavyshowerrainanddrizzle" : '/img/weather/showerrain.jpg',
					"showerdrizzle" : '/img/weather/showerrain.jpg',
					"rain" : '/img/weather/rain.jpg',
					"lightintensityshowerrain" : "/img/weather/showerrain.jpg",
					"heavyintensityshowerrain" : "/img/weather/showerrain.jpg",
					"raggedshowerrain" : "/img/weather/showerrain.jpg",
					"lightrain": "/img/weather/showerrain.jpg",
					"moderaterain": "/img/weather/showerrain.jpg",
					"heavyintensityrain": "/img/weather/showerrain.jpg",
					"veryheavyrain": "/img/weather/showerrain.jpg",
					"extremerain": "/img/weather/showerrain.jpg",
					
					"thunderstorm": '/img/weather/thunderstorm.jpg',
					"thunderstormwithlightrain" : '/img/weather/thunderstorm.jpg',
					"thunderstormwithrain" : '/img/weather/thunderstorm.jpg',
					"thunderstormwithheavyrain" : '/img/weather/thunderstorm.jpg',
					"lightthunderstorm" : '/img/weather/thunderstorm.jpg',
					"thunderstorm" : '/img/weather/thunderstorm.jpg',
					"heavythunderstorm" : '/img/weather/thunderstorm.jpg',
					"raggedthunderstorm" : '/img/weather/thunderstorm.jpg',
					"thunderstormwithlightdrizzle" : '/img/weather/thunderstorm.jpg',
					"thunderstormwithdrizzle" : '/img/weather/thunderstorm.jpg',
					"thunderstormwithheavydrizzle" : '/img/weather/thunderstorm.jpg',
					
					"snow": '/img/weather/snow.jpg',
					"freezingrain": "/img/weather/snow.jpg",
					"lightsnow": "/img/weather/snow.jpg",
					"snow": "/img/weather/snow.jpg",
					"heavysnow": "/img/weather/snow.jpg",
					"sleet": "/img/weather/snow.jpg",
					"showersleet": "/img/weather/snow.jpg",
					"lightrainandsnow": "/img/weather/snow.jpg",
					"rainandsnow": "/img/weather/snow.jpg",
					"lightshowersnow": "/img/weather/snow.jpg",
					"showersnow": "/img/weather/snow.jpg",
					"heavyshowersnow": "/img/weather/snow.jpg",

					"mist": '/img/weather/mist.jpg',
					"smoke": "/img/weather/mist.jpg",
					"haze": "/img/weather/mist.jpg",
					"sand,dustwhirls": "/img/weather/mist.jpg",
					"fog": "/img/weather/mist.jpg",
					"sand": "/img/weather/mist.jpg",
					"dust": "/img/weather/mist.jpg",
					"volcanicash": "/img/weather/mist.jpg",
					"squalls": "/img/weather/mist.jpg",
					"tornado": "/img/weather/mist.jpg"
			}

			$('#api .welcome-section').css("background-image", `url(${photos[Str]})` );
			$('#api .icon img').attr("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png` );
			$('#api .city span').text(`${city}, ${region}`);
			$('#api .temp span').text(data.main.temp);
			$('#api span.speed').text(data.wind.speed);
			$('#api .cast span').text(data.weather[0].description);
		}

		$.getJSON(weatherAPI, wData, showWeather);
	}); // end of ip api
	
	// news carousel 
	$('#myCarousel').carousel({
		interval:   7000	
	})
	$('#myCarousel .carousel-item').first().addClass('active');
	$('#myCarousel ol li').first().addClass('active');
	$('.disabled').on('click', (e) => e.preventDefault())
}); // end jquery

