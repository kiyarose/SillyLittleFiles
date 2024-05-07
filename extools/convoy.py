import os
import pexpect


def convert_ovpn_to_onc(ovpn_file, onc_file):
    """Converts a .ovpn file to the .onc file format using openvpn.

    Args:
      ovpn_file: Path to the input .ovpn file.
      onc_file: Path to the output .onc file.
    """
    # OpenVPN command to extract information from the .ovpn file
    ovpn_cmd = f"openvpn --config {ovpn_file} --show-config"

    # Spawn a child process to run the OpenVPN command
    child = pexpect.spawn(ovpn_cmd)

    # Expect output lines containing specific keywords
    data = {}
    for line in child:
        line = line.decode("utf-8").strip()
        if line.startswith("remote "):
            data["VPNServerAddress"] = line.split()[1]
        elif line.startswith("port "):
            data["VPNServerPort"] = line.split()[1]
        elif line.startswith("auth-user-pass "):
            data["VPNUsername"] = os.path.splitext(
                os.path.basename(ovpn_file))[0]

    # Close the child process
    child.close()

    # Write extracted data to the .onc file
    with open(onc_file, "w") as f:
        f.write("[VPN]\n")
        for key, value in data.items():
            f.write(f"{key}={value}\n")


# Example usage
ovpn_file = "path/to/your/file.ovpn"
onc_file = "path/to/output.onc"
convert_ovpn_to_onc(ovpn_file, onc_file)

print(f"Converted {ovpn_file} to {onc_file}")
