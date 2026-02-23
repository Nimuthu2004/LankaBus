import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import 'login_type_screen.dart';

class LanguageScreen extends StatelessWidget {
  const LanguageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: gradientBackground(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Select Preferred Language:",
                  style: TextStyle(fontSize: 22, color: Colors.white)),
              const SizedBox(height: 30),
              CustomButton(
                  text: "English",
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (_) => const LoginTypeScreen()),
                    );
                  }),
              const SizedBox(height: 15),
              CustomButton(
                  text: "සිංහල",
                  onPressed: () {
                    // TODO: Implement navigation or functionality for Sinhala
                    print("Sinhala button pressed");
                  }),
              const SizedBox(height: 15),
              CustomButton(
                  text: "தமிழ்",
                  onPressed: () {
                    // TODO: Implement navigation or functionality for Tamil
                    print("Tamil button pressed");
                  }),
            ],
          ),
        ),
      ),
    );
  }


    // Placeholder for the gradientBackground function
  Widget gradientBackground({required Widget child}) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue, Colors.purple],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: child,
    );
  }
}