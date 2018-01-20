import React from 'react';

export default function ProfileIcon(props) {
  return (
    <div className="profile-btn" {...props}>
      <svg height="30px" id="Profile" version="1.1" viewBox="0 0 139 139" width="30px">
        <circle cx="69.5" cy="41.079" r="29.608"/><path d="M86.41,74.839c-5.045,2.71-10.797,4.266-16.911,4.312c-6.114-0.046-11.87-1.602-16.914-4.312  c-10.413,9.325-26.29,19.712-26.29,48.892h42.92h0.564h42.92C112.701,94.551,96.825,84.164,86.41,74.839z"/>
      </svg>
    </div>
  );
}