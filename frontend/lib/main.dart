import 'package:flutter/material.dart';
import 'package:lanka_go/Screens/splash_screen.dart';

void main() {
  runApp(const LankaGoApp());
}

class LankaGoApp extends StatelessWidget {
  const LankaGoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen(),
    );
  }
}