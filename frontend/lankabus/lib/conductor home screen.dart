import 'package:flutter/material.dart';
import 'scan_qr_screen.dart';
import 'seat_update_screen.dart';
import 'summary_screen.dart';

import 'conductor_chatbot_screen.dart';
import 'conductor_settings_screen.dart';
import 'conductor_profile_screen.dart';
class ConductorHomeScreen extends StatefulWidget {
  const ConductorHomeScreen({super.key});

  @override
  State<ConductorHomeScreen> createState() => _ConductorHomeScreenState();
}

class _ConductorHomeScreenState extends State<ConductorHomeScreen> {

  int passengerCount = 0;

  void increasePassenger() {
    setState(() {
      passengerCount++;
    });
  }
  Widget buildButton({
    required IconData icon,
    required String text,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 18),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.2),
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: Colors.white30),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: Colors.white),
            const SizedBox(width: 10),
            Text(
              text,
              style: const TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            )
          ],
        ),
      ),
    );
  }
   @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [

          /// Background Image
          Positioned.fill(
            child: Image.asset(
              "assets/images/bus_bg.jpg",
              fit: BoxFit.cover,
            ),
          ),

          /// Gradient Overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.black.withOpacity(0.65),
                    Colors.black.withOpacity(0.35),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),
          ),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [

                  /// Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            "ND - 1030",
                            style: TextStyle(
                              fontSize: 30,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            "Let’s start the journey 🚍",
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.white70,
                            ),
                          ),
                        ],
                      ),

                      const CircleAvatar(
                        radius: 26,
                        backgroundImage:
                            AssetImage("assets/conductor.jpg"),
                      )
                    ],
                  ),

                  const SizedBox(height: 30),