import psutil
import datetime

# Thresholds
CPU_THRESHOLD = 80
MEMORY_THRESHOLD = 80
DISK_THRESHOLD = 80

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def check_cpu():
    cpu_usage = psutil.cpu_percent(interval=1)
    if cpu_usage > CPU_THRESHOLD:
        log(f"ALERT: High CPU Usage! {cpu_usage}%")
    else:
        log(f"CPU Usage: {cpu_usage}%")

def check_memory():
    memory = psutil.virtual_memory()
    if memory.percent > MEMORY_THRESHOLD:
        log(f"ALERT: High Memory Usage! {memory.percent}%")
    else:
        log(f"Memory Usage: {memory.percent}%")

def check_disk():
    disk = psutil.disk_usage('/')
    if disk.percent > DISK_THRESHOLD:
        log(f"ALERT: High Disk Usage! {disk.percent}%")
    else:
        log(f"Disk Usage: {disk.percent}%")

def show_top_processes():
    log("Top 5 CPU-consuming processes:")
    processes = [(p.info['pid'], p.info['name'], p.info['cpu_percent'])
                 for p in psutil.process_iter(['pid', 'name', 'cpu_percent'])]
    processes = sorted(processes, key=lambda x: x[2], reverse=True)[:5]

    for pid, name, cpu in processes:
        print(f" PID: {pid} | Name: {name} | CPU%: {cpu}")

def main():
    log("===== SYSTEM HEALTH MONITORING =====")
    check_cpu()
    check_memory()
    check_disk()
    show_top_processes()
    log("===== END =====")

if __name__ == "__main__":
    main()
