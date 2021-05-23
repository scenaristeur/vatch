#!/usr/bin/bash
cd
mkdir -p ".shortcuts/tasks"
cd ".shortcuts/tasks"
touch vatch.sh
touch vatch-client.sh
# shotcut to run the server
echo -e "#!/usr/bin/bash\n
cd ~/vatch #directory where you have installed vatch\n
node . #shortcut to run the server\n" > vatch.sh

#shortcut to run the client
echo -e "  #!/usr/bin/bash\n
am start --user 0 -n com.android.chrome/com.google.android.apps.chrome.Main http://localhost:3000\n" > vatch-client.sh
pwd
ls
