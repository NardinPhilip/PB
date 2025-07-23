def timeConversion(s):
    if (s[-2:] == 'PM' and s[:2] != "12") or (s[-2:] == "AM" and s[:2] == "12"):
        twentyFourHrs = int(s[0:2]) + 12 if int(s[0:2]) + 12 < 24 else "00"
        return f"{twentyFourHrs}{s[2:-2]}"
    return s[:-2]
print(timeConversion("12:45:54PM"))