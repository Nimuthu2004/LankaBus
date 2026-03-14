import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final String hint;
  final bool obscure;
  final TextEditingController? controller;
  final TextInputType keyboardType; // 

  const CustomTextField({
    super.key,
    required this.hint,
    this.obscure = false,
    this.controller,
    this.keyboardType = TextInputType.text, // 
  });