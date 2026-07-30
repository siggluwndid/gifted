import json
import requests
from anytree import Node

# Render 서버 주소
SERVER_URL = "https://gifted-eqw9.onrender.com"

def fridge_to_json():
    fridges = []
    fridge_root = Node("fridge")
    refrigerator = Node("냉장", parent=fridge_root)
    freezer = Node("냉동", parent=fridge_root)
    
    while True:
        food_name = input("식품 이름을 입력하세요(없을 시, 없음 또는 공백 입력): ")
        if food_name == "없음" or food_name == "":
            break
            
        food_location = input("식품 위치를 입력하세요(냉장 또는 냉동): ")
        food_expiration = input("식품 유통기한을 입력하세요(YYYY-MM-DD): ")
        
        if food_location == "냉장":
            Node(food_name, parent=refrigerator, expiration=food_expiration)
        elif food_location == "냉동":
            Node(food_name, parent=freezer, expiration=food_expiration)
        else:
            print("위치는 '냉장' 또는 '냉동'만 입력하세요.")
            continue
    for location in fridge_root.children:
        for food in location.children:
            food_data = {
                "name": food.name,
                "storageType": location.name,
                "expirationDate": food.expiration
            }
            fridges.append(food_data)
            
    json_data = json.dumps(
        fridges,
        ensure_ascii=False,
        indent=4
    )

    try:
        response = requests.post(
            f"{SERVER_URL}/",
            data=json_data,
            headers={
                "Content-Type": "application/json"
            }
        )
        if response.status_code in [200, 201]:
            print("\n✅ 성공적으로 DB에 저장되었습니다!")
        else:
            print(f"\n❌ 저장 실패 (상태 코드: {response.status_code})")
    except Exception as e:
        print(f"\n⚠️ 서버 통신 에러: {e}")

    return json_data


# --- 메인 실행부 ---
user_choose = input("냉장고 안의 식품을 입력하시겠습니까? (예/아니오): ")

if user_choose == "예":
    print("\n[ 입력된 JSON 데이터 ]")
    print(fridge_to_json())

elif user_choose == "아니오":
    try:
        response = requests.get(SERVER_URL)

        if response.status_code == 200:
            res_data = response.json()

            # 응답이 { foods: [...] } 객체이든 배열 [...] 이든 안전하게 foods에 할당
            if isinstance(res_data, dict):
                foods = res_data.get('foods', [])
            else:
                foods = res_data

            print("\n===== 현재 냉장고 현황 =====")
            if not foods:
                print("냉장고가 텅 비어 있습니다.")
            else:
                for food in foods:
                    # 유통기한 날짜 포맷이 길게 나올 경우 YYYY-MM-DD만 잘라내기
                    raw_exp = food.get('expirationDate') or food.get('expiration') or '날짜 없음'
                    exp_date = str(raw_exp).split('T')[0] if 'T' in str(raw_exp) else raw_exp

                    print(f"식품명   : {food.get('name')}")
                    print(f"위치     : {food.get('storageType', food.get('location'))}")
                    print(f"유통기한 : {exp_date}")
                    print("-" * 30)
        else:
            print(f"냉장고 정보를 불러오지 못했습니다. (상태 코드: {response.status_code})")

    except Exception as e:
        print(f"⚠️ 서버 통신 에러: {e}")