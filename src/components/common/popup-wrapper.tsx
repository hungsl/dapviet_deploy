'use client'
import { usePopup } from '@/app/context/popup-provider';
import React from 'react'
import Popup from './popup';
import { Checkout } from '@/app/purchase/checkout/checkout';
import { Cart } from '@/app/purchase/cart/cart';
import LoginPopup from '@/app/(authen)/login/login-popup';
import RegisterPopup from '@/app/(authen)/register/register-popup';
import { Transfer } from '@/app/purchase/transfar/transfar';
import { PaymentPage } from '@/app/purchase/payment/payment';
import { SuccessOrder } from '@/app/purchase/order-confirmation/order-confirmation';
import { FailedOrder } from '@/app/purchase/order-confirmation/fail-process';
import { QrPayment } from '@/app/purchase/QR-payment/QR-payment';
import ChangePasswordPage from '@/app/(Profile)/customer/profile/change-password';
import CreateProductForm from '@/app/(Profile)/staff/manage-product/create-product-form';
import UpdateProductForm from '@/app/(Profile)/staff/manage-product/update-product-form';
import CreateCollectionForm from '@/app/(Profile)/staff/manage-collection/create-collection-form';
import CreateCateForm from '@/app/(Profile)/staff/manage-category/create-cate-form';
import CreateSizeForm from '@/app/(Profile)/staff/manage-size/create-size-form';
import { UpdateAddressOrder } from '@/app/(Profile)/staff/manage-order/[id]/update-address';

export default function PopupWrapper() {
    const { isOpen, closePopup, content, updateValue, method } = usePopup();
    return (
        <Popup isOpen={isOpen} onClose={closePopup} isQr = {content === "qrpage"}>
          {content === 'cart' ? <Cart /> : content === 'checkout' 
          ? <Checkout /> : content === 'login' 
          ? <LoginPopup />: content === 'transfer' 
          ? <Transfer method = {method}/> : content === 'payment' 
          ? <PaymentPage /> : content === 'success' 
          ? <SuccessOrder /> :  content === 'fail' 
          ? <FailedOrder/> : content === 'qrpage' 
          ? <QrPayment /> : content === 'changepassword' 
          ? <ChangePasswordPage /> : content ==='createproduct' 
          ? <CreateProductForm /> : content ==='updateproduct' 
          ? <UpdateProductForm  productId = {updateValue} /> : content === 'createcollection' 
          ? <CreateCollectionForm /> : content === 'createcategory' 
          ? <CreateCateForm /> : content === 'createsize' 
          ? <CreateSizeForm /> : content === 'updateorderaddress'
          ? <UpdateAddressOrder />: <RegisterPopup />}
        </Popup>
      );
}
