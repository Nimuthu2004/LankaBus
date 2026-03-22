import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';

enum ResetStep { enterEmail, enterOTP, resetPassword }

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {

    ResetStep currentStep = ResetStep.enterEmail;

    final TextEditingController emailController = TextEditingController();

    final List<TextEditingController> otpControllers =
        List.generate(4, (_) => TextEditingController());

    final List<FocusNode> otpFocusNodes =
        List.generate(4, (_) => FocusNode());
    
    final TextEditingController newPassController = TextEditingController();
    final TextEditingController confirmPassController = TextEditingController();

    bool showNewPassword = false;
    bool showConfirmPassword = false;

    int seconds = 60;
    bool isTimerRunning = false;
    
    @override
    void dispose() {
        emailController.dispose();

        for (var c in otpControllers) {
            c.dispose();
        }

        for (var f in otpFocusNodes) {
            f.dispose();
        }

        newPassController.dispose();
        confirmPassController.dispose();

        super.dispose();
    }
    
    /// ================= SEND OTP =================
    void sendOTP() {
        final input = emailController.text.trim();

        if (input.isEmpty) {
            showSnack("Please enter email or phone number");
            return;
        }

        setState(() {
            currentStep = ResetStep.enterOTP;
            startTimer();
        });

        showSnack("OTP sent to $input");
    }

    /// ================= VERIFY OTP =================
    void verifyOTP() {
        String otp = otpControllers.map((e) => e.text).join();

        if (otp.length != 4) {
            showSnack("Enter complete 4 digit OTP");
            return;
        }

        setState(() {
            currentStep = ResetStep.resetPassword;
        });
    }

    /// ================= TIMER =================
    void startTimer() async {
        if (isTimerRunning) return;

        isTimerRunning = true;
        seconds = 60;

        while (seconds > 0) {
            await Future.delayed(const Duration(seconds: 1));

            if (!mounted) return;

            setState(() => seconds--);
        }

        isTimerRunning = false;
    }

    void resendOTP() {
        startTimer();
        showSnack("OTP Resent");
    }
    
    /// ================= RESET PASSWORD =================
    void resetPassword() {

        final newPass = newPassController.text.trim();
        final confirmPass = confirmPassController.text.trim();

        if (newPass.isEmpty || confirmPass.isEmpty) {
            showSnack("Please fill all fields");
            return;
        }

        if (!isStrongPassword(newPass)) {
            showSnack("Password must contain uppercase, number & special character");
            return;
        }

        if (newPass != confirmPass) {
            showSnack("Passwords do not match");
            return;
        }

        showSnack("Password reset successful");

        Navigator.pop(context);
    }

    bool isStrongPassword(String password) {
        final regex = RegExp(r'^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$&*~]).{6,}$');
        return regex.hasMatch(password);
    }

    void showSnack(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  /// ================= OTP BOXES =================
  Widget buildOTPBoxes() {

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: List.generate(4, (index) {

        return SizedBox(
          width: 60,
          child: TextField(
            controller: otpControllers[index],
            focusNode: otpFocusNodes[index],
            keyboardType: TextInputType.number,
            textAlign: TextAlign.center,
            maxLength: 1,

            inputFormatters: [
              FilteringTextInputFormatter.digitsOnly,
            ],

            style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold),

            decoration: InputDecoration(
              counterText: "",
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),

            onChanged: (value) {

              /// AUTO PASTE OTP
              if (value.length > 1) {

                for (int i = 0; i < 4; i++) {
                  if (i < value.length) {
                    otpControllers[i].text = value[i];
                  }
                }

                FocusScope.of(context).unfocus();
                return;
              }

              /// AUTO MOVE NEXT
              if (value.isNotEmpty && index < 3) {
                otpFocusNodes[index + 1].requestFocus();
              }

              /// MOVE BACK WHEN DELETE
              if (value.isEmpty && index > 0) {
                otpFocusNodes[index - 1].requestFocus();
              }
            },
          ),
        );
      }),
    );
  }

  