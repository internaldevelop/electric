package com.iie.electric.util;

/**   
 *  
 */

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MyAuthenticator extends Authenticator {
	String userName = null;
	String password = null;

	public MyAuthenticator() {
		super();
	}

	public MyAuthenticator(String username, String password) {
		this.userName = username;
		this.password = password;
	}

	protected PasswordAuthentication getPasswordAuthentication() {
		return new PasswordAuthentication(userName, password);
	}
}
