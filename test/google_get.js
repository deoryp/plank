var google = require('googleapis');
var urlshortener = google.urlshortener('v1');

var params = { shortUrl: 'http://goo.gl/xKbRu3' };


var google_auth = {
  "private_key_id": "1b57947637405730f94f5327a09fc1a146f48f6e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvaC5TRTVJf7Gk\niRndP5KbvBvNb6JRSiWMNqSmRa48PzHrEc+7Ee4lBvohKWt5ELCs0pgtK4c/TJGd\n/mATpn7mwnr/aCl1tSp4XBFLFSdiR2xKzfEslvRpFkFcD3Gw/gFiYQWTICAUIxgx\nBpl/YXW0L2Yam50B6v7DK66wmF/33wPJlARhyP8vqktOHThO3tyM6rD+/A2r0jtk\nwVYrMWDnvLSd6DRiTB0zGRvVkcB+ClB2VEXQgDXXY1Z+lVK7rooz58Jt3sphGQe6\nQ8Q8DrRjctyAxTO4cvxkpFo3azuk/mjC+X/miTM1wrWgriX5FoHNcjHPSmlLK93L\nPCqlKkDjAgMBAAECggEADqgB1utdfHqy+TCLfLUnJuQc3pmJUomDgae/MjV4TYhq\nP14JoXPqFiXzGHpBhKgkWwxtsriEYIGhWTY8COhMijON23F0pWUx20S2HTPzSn71\nSXrTwAoM+grmAy83LLbMns/Ei3qPs58LEm2evcoC779WJLsD73kXOG+Z9R+GRUu1\ntQ94uvUt/KnJfix/hOhaDCqZO9WFpl5ckWpxYPgRgmuIJLct6FIhGybnarPT/wKw\nSALsT/O/41E9aBSQYikXANU0DtTf0QUhlPl955+4w4Zaqo1YsooEmf9N4grroTmw\nhMUA3j60BYSgrttxVo6wyqZnupIxCvYihkMOltgFoQKBgQDZFKmLkumNQP6tLUMB\nd7W95y2NANWOVdYzksq5CLsszhLeYVLa8eV+ySTH7zyzONdjpAXDeKgCrmIVyQkp\nM8Z1QrHeeTdAYZKhg050vmeboUsBuGqraS014OBJ5hCPdinAPncaBox124pMdNZn\ngE+XNk+zGRE82Xtb1GORZ8QYbwKBgQDO2tJD9g2W3yj+D15Xr7XKeWPgj1Gf4Oxf\nWHYEAsqcVCUitQqpT3zOCdZJugyOuiJQvTaO7LEf8WnwDShIodSUYoWChzeXL7nj\nl34O7KdD/XmoQDf5Ex6Ly/ORGKgC8W8JdFs9JQJuPfQNwN/Gmy7q5tVXNaqDKDzf\nobAq0oBQzQKBgDFlm0MQdibXcFx13TZ7SBbjgSEB3Jab/7cSoyDB1N3YMsD5woHh\n44gbO0xnqxdZSuH4k/sr/IdHqTgt2/DNQE60k4b9bE4xJc2s9HBqV2c5p7jHfzZs\nI4aMGl2WhZQvnkaJsE5yyQmUoH7PY25/6xyMlkw52wtOrdxykwmmZB/vAoGANj9W\nszH9AFsH4hDfufk/oJjTI5oSWu5eruaBFK4yumqqzn5SDHLnFRWpV+5tyqRvyWLF\nwxe5n9ns4WJh9SJToJJx1vhlEMYYZuJc0ccoWoFH/WLSCwUDlr/m4V9o+FSevQkB\nwHhLOeQPc+foB6q81CezPUq6q+jKhg9eJuzLb+UCgYEAh1IWY2+EGVAe4xkG3Ibd\nnFcYjCPUSxr77Euz5t8IGHWmx1Yyb2yQXyzGuC8gyiYsaKF2cuElv7jJtH1ToaoW\nRFyp5zSYiApWEqtb0uoN5rlE/KlGp4FB+lY92WUbrbsdcOxlK5lvzFoSIRmjH323\nQEfGs9+XSjYqeanzoFc5yCA\u003d\n-----END PRIVATE KEY-----\n",
  "client_email": "438874572769-kria5le1t6brfid6go40lve5dp5f6s32@developer.gserviceaccount.com",
  "client_id": "438874572769-kria5le1t6brfid6go40lve5dp5f6s32.apps.googleusercontent.com",
  "type": "service_account"
};

// get the long url of a shortened url
urlshortener.url.get(params, function (err, response) {
  if (err) {
    console.log('Encountered error', err);
  } else {
    console.log('Long url is', response.longUrl);
  }
});
