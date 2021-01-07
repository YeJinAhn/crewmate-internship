package kr.co.crewmate.ojt;

import java.util.Scanner;

public class Exam5 {



	public void Exam5() {



		Scanner sc = new Scanner(System.in);



		System.out.print("문자: ");

		String str= sc.next();



		System.out.println(reverseString(str));







	}



	public static String reverseString(String str) {

		return (new StringBuffer(str)).reverse().toString();

	}


}
