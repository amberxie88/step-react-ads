package com.google.sps.data;

/** A Client Object. */
public final class Client {

  private final String  loginId;
  private final String  customerId;

  public Client(String loginId, String customerId) {
    this.customerId = customerId;
    this.loginId = loginId;
  }
}