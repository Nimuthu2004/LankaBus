import 'dart:ui';
import 'package:flutter/material.dart';
import 'login_type_screen.dart';

class LanguageScreen extends StatelessWidget {
  const LanguageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF1E3C72), Color(0xFF2A5298)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Stack(
          children: [
            /// Main Content
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    /// App Title
                    const Icon(Icons.language, size: 80, color: Colors.white),

                    const SizedBox(height: 20),

                    const Text(
                      "Choose Your Language",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),

                    const SizedBox(height: 40),

                    /// English
                    _buildGlassButton(context, "English"),

                    const SizedBox(height: 20),

                    /// Sinhala
                    _buildGlassButton(context, "සිංහල"),

                    const SizedBox(height: 20),

                    /// Tamil
                    _buildGlassButton(context, "தமிழ்"),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
