import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_TIME_KEY = "videoplayer-current-time";

const onPlay = (data) => {
    localStorage.setItem(STORAGE_TIME_KEY, data.seconds)
}

player.on('timeupdate', throttle(onPlay, 1000));

const playOnSavedTime = () => {
    player.setCurrentTime(localStorage.getItem(STORAGE_TIME_KEY))
}

playOnSavedTime();


