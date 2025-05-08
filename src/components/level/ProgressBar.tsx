import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { formatNumber } from '../../utils/helper';
import ThemedText from '../ThemedText';
import { defaultPadding, scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

interface ProgressBarProps {
    currentPoints: number;
    totalPoints: number;
    activeTab: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentPoints, totalPoints, activeTab }) => {
    const progress = Math.min(currentPoints / totalPoints, 1);
    const remainingPoints = totalPoints - currentPoints;
    const bubblePosition: `${number}%` = progress > 0.85 ? '75%' : `${progress * 100}%`;

    return (
        <View style={styles.container}>
            <View
                style={styles.background}
            >
                <View style={styles.bubbleWrapper}>
                    <View
                        style={[
                            styles.pointsBubbleContainer,
                            { left: bubblePosition, transform: [{ translateX: -50 }] }
                        ]}
                    >
                        <View style={styles.pointsBubble}>
                            <ThemedText style={styles.pointsText}>{formatNumber(currentPoints)}</ThemedText>
                        </View>
                        <View style={styles.bubblePointer} />
                    </View>
                </View>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${progress * 100}%` }
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.labelsContainer}>
                    <ThemedText style={styles.labelText}>Current points</ThemedText>
                    <View style={styles.rightLabelContainer}>
                        <ThemedText style={styles.labelText}>
                            The distance to upgrade{' '}
                        </ThemedText>
                        <ThemedText style={[styles.labelText, styles.highlightedText]}>
                            {formatNumber(remainingPoints)}
                        </ThemedText>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      overflow: 'hidden',
    },
    background: {
      padding: defaultPadding,
      paddingTop: scaleHeight(30),
      paddingBottom: scaleHeight(25),
      position: 'relative',
    },
    bubbleWrapper: {
      position: 'relative',
      height: scaleHeight(50),
      width: '100%',
    },
    pointsBubbleContainer: {
      position: 'absolute',
      alignItems: 'center',
      marginBottom: scaleHeight(20),
    },
    pointsBubble: {
      backgroundColor: 'white',
      borderRadius: scaleWidth(10),
      paddingVertical: scaleHeight(4),
      paddingHorizontal: scaleWidth(10),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.09,
      shadowRadius: scaleWidth(12),
    },
    bubblePointer: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: scaleWidth(10),
      borderRightWidth: scaleWidth(10),
      borderTopWidth: scaleHeight(10),
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'white',
      position: 'absolute',
      bottom: -scaleHeight(8),
    },
    pointsText: {
      color: '#FF5B70',
      fontSize: scaleFont(14),
      fontWeight: 'bold',
    },
    progressBarContainer: {
      width: '100%',
      marginBottom: scaleHeight(10),
    },
    progressBarBackground: {
      height: scaleHeight(6),
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: scaleHeight(3),
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: 'white',
      borderRadius: scaleHeight(3),
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    labelText: {
      color: 'white',
      fontSize: scaleFont(12),
      opacity: 0.9,
    },
    rightLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    highlightedText: {
      fontWeight: 'bold',
    },
  });

export default ProgressBar;