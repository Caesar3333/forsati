#!/bin/bash
set -e
M=$1
ffmpeg -v error -y -i $M/motion_raw.mp4 -i $M/aud/mix_final.wav -filter_complex "[0:v]curves=all='0/0.02 0.25/0.225 0.5/0.5 0.75/0.785 1/0.975',eq=saturation=0.97,vignette=angle=PI/5,noise=alls=4:allf=t+u,format=yuv420p,setsar=1[v]" -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 15 -profile:v high -level 4.2 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 320k -ar 48000 -movflags +faststart $M/ma_la_yuqal_ep1_motion_master.mp4
ffmpeg -v error -y -i $M/ma_la_yuqal_ep1_motion_master.mp4 -c:v libx264 -preset slow -b:v 11M -maxrate 14M -bufsize 22M -pass 1 -passlogfile $M/p2 -an -f null /dev/null
ffmpeg -v error -y -i $M/ma_la_yuqal_ep1_motion_master.mp4 -c:v libx264 -preset slow -b:v 11M -maxrate 14M -bufsize 22M -pass 2 -passlogfile $M/p2 -profile:v high -level 4.2 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 256k -ar 48000 -movflags +faststart $M/ma_la_yuqal_ep1_motion_upload.mp4
