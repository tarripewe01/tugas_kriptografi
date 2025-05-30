// components/PossibilityList.tsx
import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { animateText } from '../utils/animateText';

interface PossibilityListProps {
  possibilities: string[];
}

const PossibilityList: React.FC<PossibilityListProps> = ({ possibilities }) => {
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState('');
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);

  useEffect(() => {
    if (possibilities.length === 0) return;

    // Reset state ketika possibilities berubah
    setAnimatedIndex(0);
    setCompletedTexts([]);
    setAnimatedText('');

  }, [possibilities]);

  useEffect(() => {
    if (animatedIndex >= possibilities.length) return;

    const cancel = animateText(
      possibilities[animatedIndex],
      (output) => setAnimatedText(output),
      () => {
        setCompletedTexts((prev) => [...prev, possibilities[animatedIndex]]);
        setAnimatedIndex((idx) => idx + 1);
      },
      30
    );

    return cancel;
  }, [animatedIndex, possibilities]);

  return (
    <IonList>
      {completedTexts.map((text, idx) => (
        <IonItem key={idx}>
          <IonLabel>{text}</IonLabel>
        </IonItem>
      ))}

      {/* Animasi sedang berlangsung */}
      {animatedIndex < possibilities.length && (
        <IonItem>
          <IonLabel>{animatedText}</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default PossibilityList;
