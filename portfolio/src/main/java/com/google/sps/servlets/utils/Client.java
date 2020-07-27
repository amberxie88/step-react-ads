package com.google.sps.data;

/** A Client Object. */
public final class Client {

  private final String  loginId;
  private final String  customerId;
  private final String  name;

  public Client(String loginId, String customerId, String name) {
    this.customerId = customerId;
    this.loginId = loginId;
    this.name = name;
  }
}