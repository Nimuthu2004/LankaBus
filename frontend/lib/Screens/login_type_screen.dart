import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import 'login_screen.dart';
import 'conductor_register_screen.dart';
import 'splash_screen.dart';

class LoginTypeScreen extends StatelessWidget {
  const LoginTypeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: gradientBackground(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [