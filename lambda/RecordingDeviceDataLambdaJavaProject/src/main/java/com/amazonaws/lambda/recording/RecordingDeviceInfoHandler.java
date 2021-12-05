package com.amazonaws.lambda.recording;

import	java.text.SimpleDateFormat;
import	java.util.TimeZone;
import	com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import	com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import	com.amazonaws.services.dynamodbv2.document.DynamoDB;
import	com.amazonaws.services.dynamodbv2.document.Item;
import	com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import	com.amazonaws.services.dynamodbv2.document.spec.PutItemSpec;
import	com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import	com.amazonaws.services.lambda.runtime.Context;
import	com.amazonaws.services.lambda.runtime.RequestHandler;

public class RecordingDeviceInfoHandler implements RequestHandler<Thing,	String> {
	private	DynamoDB dynamoDb;
	private	String DYNAMODB_TABLE_NAME	= "DeviceData"; //deviceData 테이블로 지정
	
	@Override
	public	String	handleRequest(Thing	input,	Context	context) {
		this.initDynamoDbClient();
		persistData(input);  //db에 저장
		return "Success	in storing to DB!";
	}
	
	private	PutItemOutcome	persistData(Thing	thing) throws	ConditionalCheckFailedException	{
		//	Epoch	Conversion	Code:	https://www.epochconverter.com/
		SimpleDateFormat	sdf	= new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");  //날짜 형식 지정
		sdf.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));  //timezone을 서울로 지정
		String timeString = sdf.format(new java.util.Date (thing.timestamp*1000));
		return this.dynamoDb.getTable(DYNAMODB_TABLE_NAME)
				.putItem(new PutItemSpec().withItem(new Item().withPrimaryKey("time", thing.timestamp)  //유일키 지정
						.withString("temperature",	thing.state.reported.temperature)  //첫번째 컬럼 temperature
						.withString("humidity",	thing.state.reported.humidity)  //두번째 컬럼 humidity
						.withString("timestamp",timeString)));  //세번째 컬럼 timestamp 으로 저장
	}
	
	private void initDynamoDbClient() {
		AmazonDynamoDB	client	=	AmazonDynamoDBClientBuilder.standard().
				withRegion("ap-northeast-2").build();  //dynamodb 접속을 위한 인스턴스 생성
		this.dynamoDb	= new DynamoDB(client);  //dynamodb 인스턴스 생성
	}
}

class Thing {
	public	State state	= new State();
	public long	timestamp;
	public class State {
		public	Tag	reported = new Tag();
		public	Tag	desired	= new Tag();
		public class Tag {
			public	String temperature;
			public	String humidity;
		}
	}
}