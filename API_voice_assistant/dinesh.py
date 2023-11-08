# import speech_recognition as aa
# import pyttsx3
# import pywhatkit
# import datetime
# import wikipedia

# listener = aa.Recognizer()

# machine = pyttsx3.init()


# def talk(text):
#     machine.say(text)
#     machine.runAndWait()


# def input_instruction():
#     global instruction

#     try:
#         with aa.Microphone() as origin:
#             print("Listening....")
#             speech = listener.listen(origin)
#             instruction = listener.recognize_google(speech)
#             instruction = instruction.lower()
#             if "Hitesh" in instruction:
#                 instruction = instruction.replace("Hitesh", " ")
#                 print(instruction)

#     except:
#         pass
#     return instruction


# def playHitesh():
#     instruction = input_instruction()
#     print(instruction)
#     if "play" in instruction:
#         song = instruction.replace("play", "")
#         talk("playing" + song)
#         pywhatkit.playonyt(song)

#     elif "time" in instruction:
#         time = datetime.datetime.now().strftime("%I: %M %p")
#         talk("Current Time: " + time)

#     elif "date" in instruction:
#         date = datetime.datetime.now().strftime("%d /%m /%y")
#         talk("Today`s date " + date)

#     elif "how are you" in instruction:
#         talk("i am fine, what about you")

#     elif "who is" in instruction:
#         human = instruction.replace("who is", "")
#         info = wikipedia.summary(human, 1)
#         print(info)
#         talk(info)
#     else:
#         talk("Please repeat")


# playHitesh()


# import speech_recognition as aa
# import pyttsx3
# import pywhatkit
# import datetime
# import wikipedia

# listener = aa.Recognizer()
# machine = pyttsx3.init()


# def talk(text):
#     machine.say(text)
#     machine.runAndWait()


# def input_instruction():
#     global instruction

#     try:
#         with aa.Microphone() as origin:
#             print("Listening....")
#             speech = listener.listen(origin)
#             instruction = listener.recognize_google(speech)
#             instruction = instruction.lower()
#             if "Hitesh" in instruction:
#                 instruction = instruction.replace("Hitesh", " ")
#                 print(instruction)

#     except:
#         pass
#     return instruction


# def playHitesh():
#     instruction = input_instruction()
#     print(instruction)
#     if "play" in instruction:
#         song = instruction.replace("play", "")
#         talk("playing" + song)
#         pywhatkit.playonyt(song)

#     elif "time" in instruction:
#         time = datetime.datetime.now().strftime("%I:%M %p")
#         talk("Current Time: " + time)

#     elif "date" in instruction:
#         date = datetime.datetime.now().strftime("%d/%m/%y")
#         talk("Today's date " + date)

#     elif "how are you" in instruction:
#         talk("I am fine, what about you")

#     elif "who is" in instruction:
#         human = instruction.replace("who is", "")
#         info = wikipedia.summary(human, 1)
#         print(info)
#         talk(info)
#     else:
#         talk("Please repeat")


# if __name__ == "__main__":
#     instruction = ""  # Define the 'instruction' variable
#     playHitesh()


import os
import sys

python_path = sys.executable
print(python_path)