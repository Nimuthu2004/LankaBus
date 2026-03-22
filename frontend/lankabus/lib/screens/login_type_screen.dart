import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import 'user_login_screen.dart';
import 'conductor_login_screen.dart';

class LoginTypeScreen extends StatelessWidget {
  const LoginTypeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF1E3C72), Color(0xFF2A5298)],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Logo Image
              Image.asset('assets/images/logo.png', width: 120, height: 120),
              const SizedBox(height: 20),

              // App Title
              const Text(
                "Welcome to Lanka Bus",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 50),

              // Buttons
              CustomButton(
                text: "User",
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => UserLoginScreen()),
                  );
                },
              ),
              const SizedBox(height: 20),
              CustomButton(
                text: "Conductor",
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => ConductorLoginScreen()),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
