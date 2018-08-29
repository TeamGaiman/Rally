import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config/firebase_config.js';

firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;