/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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