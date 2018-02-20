import React from 'react';
import { FooterStyled, WrapStyled } from './styled';

export default function Footer() {
  return (
    <FooterStyled>
      <WrapStyled>
        <span>@ 2018 ourthoughts</span>
        <span>Created by Konstantin Otpushchennikov</span>
      </WrapStyled>
    </FooterStyled>
  );
}