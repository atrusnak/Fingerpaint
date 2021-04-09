import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe three fingers gesture
const threeFingersDescription = new GestureDescription('threeFingers');


// thumb:
threeFingersDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// index:
threeFingersDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
threeFingersDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);
threeFingersDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

// middle:
threeFingersDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
threeFingersDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
threeFingersDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.75);

// ring:
threeFingersDescription.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
threeFingersDescription.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);
threeFingersDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

// pinky:
threeFingersDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// give additional weight to index and ring fingers
threeFingersDescription.setWeight(Finger.Index, 2);
threeFingersDescription.setWeight(Finger.Middle, 2);
threeFingersDescription.setWeight(Finger.Ring, 2);

export default threeFingersDescription;