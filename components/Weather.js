import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather',
    key: 'YOUR_API_KEY', // Muuta tähän oma API-avain
    icons: 'http://openweathermap.org/img/wn/'
};

export default function Weather(props) {
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const url = `${api.url}?lat=${props.latitude}&lon=${props.longitude}&units=metric&appid=${api.key}`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setTemp(json.main.temp);
        setDescription(json.weather[0].description);
        setIcon(`${api.icons}${json.weather[0].icon}@2x.png`);
      })
      .catch(error => {
        setDescription("Error retrieving weather information");
        console.log(error);
      });
  }, [props.latitude, props.longitude]);

  return (
    <View>
      <Text style={styles.temp}>{temp}</Text>
      {icon && 
        <Image source={{ uri: icon }} style={{ width: 100, height: 100 }} />
      }
      <Text>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  temp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
