from collections import Counter

LOG_FILE = "access.log"

def analyze_logs():
    ip_list = []
    page_list = []
    status_list = []

    try:
        with open(LOG_FILE, "r") as log:
            for line in log:
                parts = line.split()

                if len(parts) < 9:
                    continue  # skip bad lines

                ip = parts[0]              # IP Address
                page = parts[6]            # Requested page (GET /page)
                status = parts[8]          # HTTP status code

                ip_list.append(ip)
                page_list.append(page)
                status_list.append(status)

    except FileNotFoundError:
        print(f"ERROR: File '{LOG_FILE}' not found.")
        return

    print("\n===== SIMPLE LOG ANALYSIS REPORT =====")

    print(f"Total Requests: {len(status_list)}")

    print(f"Total 404 Errors: {status_list.count('404')}")

    print("\nTop 5 Most Requested Pages:")
    for page, count in Counter(page_list).most_common(5):
        print(f" {page}: {count} requests")

    print("\nTop 5 IP Addresses:")
    for ip, count in Counter(ip_list).most_common(5):
        print(f" {ip}: {count} requests")

    print("===== END OF REPORT =====\n")

if __name__ == "__main__":
    analyze_logs()
