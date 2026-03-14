import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const LankaBusApp());
}

class LankaBusApp extends StatelessWidget {
  const LankaBusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lanka Bus',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
      ),
      home: const SplashScreen(),
    );
  }
}