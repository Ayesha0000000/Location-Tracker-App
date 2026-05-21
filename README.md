# 📍 Expo Location Tracker

<div align="center">

[![Expo Version](https://img.shields.io/badge/Expo-SDK%2050-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.73.6-blue.svg)](https://reactnative.dev)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://expo.dev)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A powerful React Native Expo application that fetches user's live location and displays it on an interactive map with real-time updates.**

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Screenshots](#-screenshots)

</div>

---

## 🎯 Overview

**Expo Location Tracker** is a production-ready mobile application built with React Native and Expo that allows users to:

- 🔍 Get their current GPS coordinates with high accuracy
- 🗺️ View their location on an interactive map
- 📍 See visual representation of GPS accuracy with a dynamic circle
- 🎯 Center the map to their location with one tap
- 🔄 Get real-time location updates as they move

---

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| 🎯 **Live Location** | Real-time GPS tracking with high accuracy |
| 🗺️ **Interactive Map** | Pinch zoom, pan, and explore the map |
| 📍 **Custom Marker** | Beautiful animated marker with pulse effect |
| 🎨 **Accuracy Circle** | Visual radius showing GPS precision |
| 🔄 **Real-time Updates** | Map follows your movement automatically |
| 📱 **Cross-platform** | Works perfectly on iOS and Android |

### UI/UX Features
- 🌓 **Professional Design** - Modern card-based UI with smooth animations
- 💫 **Loading States** - Beautiful loading screens with animations
- ⚠️ **Error Handling** - Graceful error handling with retry options
- 📊 **Location Info** - Real-time coordinates display with accuracy meter
- 🎯 **Center Button** - One-tap centering to current location

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/300x600?text=Map+View" width="250" alt="Map View"/>
        <br/>
        <b>🗺️ Map View</b>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/300x600?text=Location+Card" width="250" alt="Location Card"/>
        <br/>
        <b>📍 Location Card</b>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/300x600?text=Loading+Screen" width="250" alt="Loading Screen"/>
        <br/>
        <b>⏳ Loading Screen</b>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/client) app on your phone

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/expo-location-tracker.git

# 2. Navigate to project directory
cd expo-location-tracker

# 3. Install dependencies
npm install

# 4. Install Expo Location and Maps
npx expo install expo-location react-native-maps

# 5. Start the development server
npx expo start
