import 'dart:ui';
import 'package:flutter/material.dart';
import 'qr_scan_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int selectedIndex = 0;

    @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true, // important for transparent nav
      body: Stack(
        children: [
            ///  Background Image
            SizedBox.expand(
                hild: Image.asset(
                "assets/images/home_bg.png",
                fit: BoxFit.cover,
                ),
            ),

            /// 🔹 Dark overlay
             Container(color: Colors.black.withOpacity(0.3)),

            /// 🔹 Main Content
            SafeArea(
                child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                             const SizedBox(height: 20),

                             /// Greeting
                             const Text(
                                "Hi, Binuka",
                                style: TextStyle(
                                    fontSize: 26,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white),
                            ),
                             const Text(
                                "Let's start the journey",
                               style:
                                TextStyle(fontSize: 14, color: Colors.white70),
                             ),
                             
                             const SizedBox(height: 30),

                             buildInputField("From"),
                             const SizedBox(height: 15),
                             buildInputField("To"),
                             const SizedBox(height: 15),
                             buildInputField("Date"),

                             const SizedBox(height: 30),

                             buildMenuButton(Icons.confirmation_number, "Tickets"),
                             buildMenuButton(Icons.map, "Route"),
                             buildMenuButton(Icons.account_balance_wallet, "Wallet"),
                             buildMenuButton(Icons.history, "History"),

                             const Spacer(),
                             const SizedBox(height: 80), // space for bottom nav
                        ],
                    ),
                ),
            ),

            /// 🔹 Floating QR Button
             Positioned(
                bottom: 45,
                left: MediaQuery.of(context).size.width / 2 - 30,
                child: GestureDetector(
                    onTap: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => const QRScanScreen())),
                        
                    },
                    child: Container(
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(50),
                            boxShadow: [
                                BoxShadow(
                                    color: Colors.black.withOpacity(0.4),
                                    blurRadius: 10,
                                ),
                            ],
                        ),
                        child: const Icon(Icons.qr_code_scanner,
                            size: 28, color: Colors.black),
                    ),
                ),
            ),
        ],
      ),

      /// Bottom Navigation Bar
      bottomNavigationBar: ClipRRect(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(25)),
        child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
            child: Container(
                height: 70,
                decoration: BoxDecoration(
                 color: Colors.white.withOpacity(0.15),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                         buildNavItem(Icons.home, 0),
                         buildNavItem(Icons.confirmation_number, 1),
                         const SizedBox(width: 40), // space for QR button
                         buildNavItem(Icons.person, 2),
                         buildNavItem(Icons.settings, 3),
                        ],
                ),
            ),
        ),
      ),
    );
  }
  