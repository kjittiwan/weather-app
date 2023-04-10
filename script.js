const errorMessage = document.querySelector('.error-message')
const inputForm = document.querySelector('form');
const textInput = document.querySelector('input[type="text"]');
const getWeather = async(location) => {
    errorMessage.style.display = 'none';
    textInput.classList.remove('error-input')
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=abfb91983a564e90b5274228231004&q=${location}`, {mode: 'cors'});
    const weatherData = await response.json();
    const processedData = processData(weatherData);
    displayData(processedData);
}
const processData = (initialData) => {
  const processedData = {
    city: initialData.location.name,
    condition: initialData.current.condition.text,
    temp: initialData.current.temp_c,
    feelsLike: initialData.current.feelslike_c,
    humidity: initialData.current.humidity,
    wind: initialData.current.wind_kph   
  }
  if (initialData.location.country === 'United States of America'){
    processedData['region'] = initialData.location.region;
  }
  else {
    processedData['region'] = initialData.location.country;
  }
  return processedData;
}
const displayData = (data) => {
  document.querySelector('.condition-text').textContent = data.condition
  document.querySelector('.location-text').textContent = `${data.city}, ${data.region}`
  document.querySelector('.temp-text').textContent = `${data.temp}°C`
  document.querySelector('.feelslike-text').textContent = `Feels like: ${data.feelsLike}°C`
  document.querySelector('.wind-text').textContent = `Wind: ${data.wind} MPH`
  document.querySelector('.humidity-text').textContent = `Humidity: ${data.humidity}%`
}

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather(textInput.value).catch(error => {
    errorMessage.style.display = 'block';
    textInput.classList.add('error-input');
  });
  inputForm.reset();
})