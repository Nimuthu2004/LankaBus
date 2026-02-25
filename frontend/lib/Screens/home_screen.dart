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