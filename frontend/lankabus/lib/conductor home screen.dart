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
                  /// Passenger Count
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.white30),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [

                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              "Passengers",
                              style: TextStyle(
                                color: Colors.white70,
                                fontSize: 16,
                              ),
                            ),
                            SizedBox(height: 5),
                            Text(
                              "Live Count",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            )
                          ],
                        ),

                        Text(
                          passengerCount.toString(),
                          style: const TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        )
                      ],
                    ),
                  ),

                  const SizedBox(height: 40),

                  /// Buttons

                  buildButton(
                    icon: Icons.qr_code_scanner,
                    text: "Scan QR Code",
                    onTap: () {
                      increasePassenger();

                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const ScanQRScreen(),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 20),

                  buildButton(
                    icon: Icons.event_seat,
                    text: "Seat Update",
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const SeatUpdateScreen(),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 20),

                  buildButton(
                    icon: Icons.summarize,
                    text: "Journey Summary",
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const SummaryScreen(),
                        ),
                      );
                    },
                  ),

                  const Spacer(),
                   /// Bottom Navigation
                  Container(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(30),
                      border: Border.all(color: Colors.white30),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [

                        /// ChatBot
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    const ConductorChatbotScreen(),
                              ),
                            );
                          },
                          child: const Icon(
                            Icons.chat,
                            color: Colors.white,
                            size: 28,
                          ),
                        ),

                        /// Settings
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    const ConductorSettingsScreen(),
                              ),
                            );
                          },
                          child: const Icon(
                            Icons.settings,
                            color: Colors.white70,
                            size: 28,
                          ),
                        ),

                        /// Profile
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    const ConductorProfileScreen(),
                              ),
                            );
                          },
                          child: const Icon(
                            Icons.person,
                            color: Colors.white70,
                            size: 28,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}