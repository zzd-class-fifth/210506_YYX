@echo off

title ��Դ�ļ�����
echo ����������ǰĿ¼�µ���Դ�ļ�.......  

REM  '>' ���ԭtxt�ĵ��е�������д�룬�� '>>'�����ڱ���ԭ�����ݵ�ǰ����д��

REM ��ǰʱ��
for /F "usebackq tokens=1,2 delims==" %%i in (`wmic os get LocalDateTime /VALUE 2^>NUL`) do if '.%%i.'=='.LocalDateTime.' set ldt=%%j
set ldt=%ldt:~0,4%-%ldt:~4,2%-%ldt:~6,2% %ldt:~8,2%:%ldt:~10,2%:%ldt:~12,6%

echo /* Site resources file. Created at %ldt% */ > "manifest.txt"

echo var manifest = [ >> "manifest.txt"

for %%G in (.jpg,.jpeg,.png,.gif,.css,.mp3,.mp4) do (
  for /f "delims=" %%A in ('forfiles /s /m *%%G /c "cmd /c echo @relpath"') do (
      set "file=%%~A"
      setlocal enableDelayedExpansion

      echo '!file:~2!', >> "manifest.txt"
      endlocal
  )
)

echo ];export default {manifest} >> "manifest.txt"

echo ��ʱ�ļ��������

del manifest.js
setlocal ENABLEDELAYEDEXPANSION
set filein="manifest.txt"
set fileout="manifest.js"
set old=\
set new=/
for /f "tokens=* delims=" %%i in ( '"type %filein%"') do (
    set str=%%i
    set str=!str:%old%=%new%!
    echo !str! >> %fileout%
)

del manifest.txt
echo �������!  
pause