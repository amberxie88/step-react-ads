package com.google.sps.data;


import java.io.IOException;
import java.io.FileInputStream;
import java.util.Properties;

public class ReadProperties {
  
  private String filename;

  public ReadProperties (String file){
    this.filename = file;
  } 
  
  public String getProp(String title) throws IOException{
    Properties prop = new Properties();
    try {
        prop.load(new FileInputStream(filename));
        return prop.getProperty(title);
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
  }
}