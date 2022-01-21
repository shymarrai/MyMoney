import React, { useEffect } from 'react'
import {
Dimensions, StyleSheet, View, Animated, Easing,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const styles = StyleSheet.create({
shimmer: {
overflow: 'hidden',
backgroundColor: '#0000',
borderRadius: 56,
},
})
const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export function Shimmer({ width=SCREEN_WIDTH, height=SCREEN_HEIGHT }) {
    const START = -1
    const END = 1
    const DURATION = 2000
    const COLORS = ['#0000', '#eee', '#0000']
    const LOCATIONS = [0.3, 0.5, 0.7]
    const ANIMATION = new Animated.Value(START)

    useEffect(() => {
        const runAnimation = () => {
        ANIMATION.setValue(START)
        Animated.timing(ANIMATION, {
        delay: 100,
        toValue: END,
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
        }).start(runAnimation)
    }
        runAnimation()
    }, [])

    const linear = ANIMATION.interpolate({
        inputRange: [START, END],
        outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
    })
    return (
    <View
        style={[styles.shimmer, {
        width, height, position: 'absolute', zIndex: 10,
        }]}
    >
        <Animated.View
            style={{
            flex: 1,
            transform: [{ translateX: linear }],
            }}
        >
            <LinearGradient
                style={{ flex: 1, width: SCREEN_WIDTH }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={LOCATIONS}
                colors={COLORS}
            />
        </Animated.View>
    </View>
    )
}